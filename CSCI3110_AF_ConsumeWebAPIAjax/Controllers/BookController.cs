﻿using Microsoft.AspNetCore.Mvc;

namespace CSCI3110_AF_ConsumeWebAPIAjax.Controllers
{
    public class BookController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Details()
        {
            return View();
        }

        public IActionResult Create()
        {
            return View();
        }

        public IActionResult Edit() 
        {
            return View();
        }
    }
}
