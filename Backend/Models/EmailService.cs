using Backend.Dtos.Email;
using MailKit.Net.Smtp;
using MimeKit;

namespace Backend.Models;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(EmailRequest request)
    {
        var emailSettings = _configuration.GetSection("EmailSettings");

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(emailSettings["SenderName"], emailSettings["SenderEmail"] ?? throw new InvalidOperationException("SenderEmail não configurado.")));
        message.To.Add(new MailboxAddress("", request.ToEmail));
        message.Subject = request.Subject;

        var bodyBuilder = new BodyBuilder { HtmlBody = request.Body };
        message.Body = bodyBuilder.ToMessageBody();

        using (var client = new SmtpClient())
        {
            await client.ConnectAsync(
                emailSettings["SmtpServer"] ?? throw new InvalidOperationException("SmtpServer não configurado."),
                int.Parse(emailSettings["Port"] ?? throw new InvalidOperationException("Port não configurado.")),
                MailKit.Security.SecureSocketOptions.StartTls
            );

            await client.AuthenticateAsync(emailSettings["SenderEmail"] ?? throw new InvalidOperationException("SenderEmail não configurado."), emailSettings["AppPassword"] ?? throw new InvalidOperationException("AppPassword não configurado."));

            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}
