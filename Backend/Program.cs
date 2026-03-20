var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

// using Backend.Models;

// Aluno aluno = new Aluno
// (
//     nome: "Pedro",
//     idade: 19,
//     cpf: "11122233344",
//     rm: "12485u5jdjzcn",
//     turma: "dev"
// );

// Usuario usuario = new Usuario
// (
//     nome: "Maria",
//     sobrenome: "Silva",
//     login: "maria@exemplo.com",
//     senha: "123456"
// );

// Registro registro = new Registro
// (
//     alunoId: aluno.Id,
//     data: DateTime.Now,
//     motivo: "Consulta médica",
//     quemEmitiu: "Maria Silva",
//     quemPermitiu: "João Pereira",
//     telefone: "11987654321"
// );

// Console.WriteLine($"IdAluno: {aluno.Id}, Nome: {aluno.Nome}, Idade: {aluno.Idade}, CPF: {aluno.Cpf}, RM: {aluno.Rm}, Turma: {aluno.Turma}, Quantidade de Faltas: {aluno.QuantidadeFaltas}");
// Console.WriteLine($"Usuário: {usuario.Nome} {usuario.Sobrenome}, Login: {usuario.Login}, Senha: {usuario.Senha}, Lembrar de mim: {usuario.LembrarDeMim}, Ativo: {usuario.Ativo}");
// Console.WriteLine($"Registro: Aluno ID: {registro.AlunoId}, Aluno: {aluno.Nome}, Data: {registro.Data}, Motivo: {registro.Motivo}, Emitido por: {registro.QuemEmitiu}, Permitido por: {registro.QuemPermitiu}, Telefone: {registro.Telefone}");