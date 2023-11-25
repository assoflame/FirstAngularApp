using Microsoft.AspNetCore.Mvc;
using webapp.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


builder.Services.ConfigureDbContext(builder.Configuration);

builder.Services.ConfigureServiceManager();

builder.Services.ConfigureUnitOfWork();

builder.Services.ConfigureJWT(builder.Configuration);

builder.Services.AddAuthorization();

builder.Services.ConfigureCors();



var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors();

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
