using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos.Email
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailRequest request);
    }
}