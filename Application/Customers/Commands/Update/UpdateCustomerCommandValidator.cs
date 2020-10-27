using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace Application.Customers.Commands.Update
{
    public class UpdateCustomerCommandValidator : AbstractValidator<UpdateCustomerCommand>
    {
        public UpdateCustomerCommandValidator()
        {
            RuleFor(r => r.FirstName)
                .NotEmpty().WithMessage("Firstname is required")
                .MaximumLength(50).WithMessage("Firstname max 50 characters");
            
            RuleFor(r => r.LastName)
                .NotEmpty().WithMessage("LastName is required")
                .MaximumLength(50).WithMessage("LastName max 50 characters");
        }
    }
}
