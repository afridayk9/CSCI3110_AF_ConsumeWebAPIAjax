using CSCI3110_AF_ConsumeWebAPIAjax.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSCI3110_AF_ConsumeWebAPIAjax.Controllers
{
    public class Book2Controller : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Details()
        {
            return View();
        }

        public IActionResult Create(Book book)
        {
            if (ModelState.IsValid) 
            {
                return Json(new { message = "success", book });
            }
            return Json("fail");
        }

        public IActionResult Edit()
        {
            return View();
        }

        public IActionResult Delete(int id)
        {
            return View();
        }
    }
}

