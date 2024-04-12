global using api.Models;
global using api.Settings;
global using Microsoft.Extensions.Options;
global using api.DTOs;
global using Microsoft.AspNetCore.Mvc;
global using MongoDB.Bson;
global using MongoDB.Driver;
global using MongoDB.Driver.Linq; // needed for AnyAsync()
global using System.ComponentModel.DataAnnotations;
global using MongoDB.Bson.Serialization.Attributes;
global using api.Interfaces;
global using api.Services;
global using api.Extensions;
global using api.Models.Errors;
global using System.Text.Json;
global using api.Models.Helpers;

global using System.Text;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.IdentityModel.Tokens;
global using Microsoft.AspNetCore.Authorization;
global using image_processing.Interfaces;
global using image_processing.Services;
global using image_processing.Helpers;
global using api.Helpers;
global using api.Middleware;

global using api.Repositoreis;
//global using Microsoft.Extensions.Options;
global using api.Controllers.Helpers;