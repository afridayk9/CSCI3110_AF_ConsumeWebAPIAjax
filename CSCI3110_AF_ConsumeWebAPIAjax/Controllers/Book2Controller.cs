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

        public IActionResult Create()
        {
            return View();
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

