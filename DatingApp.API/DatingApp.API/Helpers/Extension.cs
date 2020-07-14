﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extension
    {
        public static void AddApplicationError(this HttpResponse response, String message)
        {

            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-Control-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }
    }
}
