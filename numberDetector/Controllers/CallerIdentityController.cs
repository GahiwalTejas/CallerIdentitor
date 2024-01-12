using numberDetector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Razor.Tokenizer.Symbols;

namespace numberDetector.Controllers
{
    [RoutePrefix("api/CallerIdentity")]
    public class CallerIdentityController : ApiController
    {
        private TrueCallerEntities1 db = new TrueCallerEntities1();

        // GET: api/CallerIdentity


        // GET: api/CallerIdentity/5

        // GET: api/CallerIdentity/5555555
        //POST : api/CallerIdentity/SearchByMoNumber

        [HttpPost]
        [Route("SearchByMoNumber/")]
        public string SearchByMoNumber([FromBody] String search)
        {


            var resultContact = db.Contacts
     .Where(contact => contact.MoNumber == search)
     .Select(contact => new
     {
         contact.Name,
         contact.email
     })
     .FirstOrDefault(); // or .ToList() if you expect multiple results
            if (resultContact == null)
            {
                int resultSpam = db.Spams
    .Where(spam => spam.MoNumber == search)
    .Select(spam => spam.SpamId)
    .FirstOrDefault(); // or .ToList() if you expect multiple results

                if (resultSpam == 0)
                {
                    Spam newSpam = new Spam
                    {
                        MoNumber = search,

                    };

                    db.Spams.Add(newSpam);
                    db.SaveChanges();
                    return "Spam Number";
                }
                return "Spam Number";

            }
            else
            {
                return resultContact.ToString();
            }





        }














        // post: api/calleridentity
        [HttpPost]
        [Route("SearchByName/")]
        public IHttpActionResult SearchByName([FromBody] string search)
        {
            var results = db.Contacts
    .Where(contact => contact.Name.StartsWith("Sh"))
    .Select(contact => new
    {
        contact.Name,
        contact.MoNumber
    })
    .ToList();
            if (results.Any())
            {
                return Ok(results);

            }
            else
            {
                return NotFound();
            }


        }










    }

    internal class FrombodyAttribute : Attribute
    {
    }
}
