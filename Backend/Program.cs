using System.Text;
using Backend.Data;
using Backend.Dtos.Aluno;
using Backend.Dtos.Registro;
using Backend.Dtos.Turma;
using Backend.Dtos.Usuario;
using Backend.Models;
using Mapster;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<BackendContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BackendContext")
    ?? throw new InvalidOperationException("Connection string 'BackendContext' not found.")));

var jwtSection = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSection.GetValue<string>("SecretKey") 
    ?? throw new InvalidOperationException("Chave secreta não encontrada nas configurações.");
var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = securityKey,
        
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

var requireAuthPolicy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build();

builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(requireAuthPolicy)
    .AddPolicy("Public", policy => policy.RequireAssertion(_ => true));

builder.Services.AddControllers();

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        document.Components ??= new OpenApiComponents();
        document.Components.SecuritySchemes ??= new Dictionary<string, IOpenApiSecurityScheme>();

        document.Components.SecuritySchemes["Bearer"] = new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            Description = "Cole APENAS o token puro gerado no login (sem a palavra Bearer)"
        };

        if (document.Paths != null)
        {
            foreach (var path in document.Paths.Values)
            {
                if (path.Operations != null)
                {
                    foreach (var operation in path.Operations.Values)
                    {
                        operation.Security ??= new List<OpenApiSecurityRequirement>();
                        var schemeReference = new OpenApiSecuritySchemeReference("Bearer", document);
                        var requirement = new OpenApiSecurityRequirement
                        {
                            [schemeReference] = new List<string>()
                        };
                        operation.Security.Add(requirement);
                    }
                }
            }
        }
        return Task.CompletedTask;
    });
});

TypeAdapterConfig<PatchAlunoRequest, Aluno>.NewConfig().IgnoreNullValues(true);
TypeAdapterConfig<PatchRegistroRequest, Registro>.NewConfig().IgnoreNullValues(true);
TypeAdapterConfig<PatchUsuarioRequest, Usuario>.NewConfig().IgnoreNullValues(true);
TypeAdapterConfig<PatchTurmaRequest, Turma>.NewConfig().IgnoreNullValues(true);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi().AllowAnonymous();
    
    app.MapScalarApiReference().RequireAuthorization("Public"); 
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
