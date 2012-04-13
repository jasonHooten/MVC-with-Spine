using System.Web.Mvc;
using MVCwithSpine.Models.Foo;

namespace MVCwithSpine.Controllers
{
    public class FooController : Controller
    {
        public ActionResult EmptyExample()
        {
            var indexViewModel = new IndexViewModel
                                     {
                                         DisplayTemplate = "_FooTemplate"
                                     };
            return View("Index", indexViewModel);
        }
    }
}
