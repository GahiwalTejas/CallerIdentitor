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

        [HttpGet]
        [Route("Search")]
        public List<string> Search(string keyword)
        {

            try
            {
                int result = int.Parse(keyword); // This will throw a FormatException

                List<string> list = new List<string>();
                var resultContact = db.Contacts
    .Where(contact => contact.MoNumber.StartsWith(keyword))
    .Select(contact => new
    {
        contact.Name,
        contact.email
    })
    .ToList();

                // or .ToList() if you expect multiple results
                if (resultContact.Count == 0)
                {
                    int resultSpam = db.Spams
        .Where(spam => spam.MoNumber == keyword)
        .Select(spam => spam.SpamId)
        .FirstOrDefault(); // or .ToList() if you expect multiple results

                    if (resultSpam == 0)
                    {
                        Spam newSpam = new Spam
                        {
                            MoNumber = keyword,

                        };

                        db.Spams.Add(newSpam);
                        db.SaveChanges();
                    }

                    list.Add("Spam Number");
                    return list;



                }
                else
                {
                    foreach (var item in resultContact)
                    {
                        list.Add(item.Name + " " +item.email);
                    }
                    return list;
                }



            }
            catch (FormatException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                List<string> list2 = new List<string>();
                var results = db.Contacts
                             .Where(contact => contact.Name.StartsWith(keyword))
                             .Select(contact => new
                              {
                                contact.Name,
                                contact.MoNumber
                              })
                             .ToList();
                if(results.Count == 0)
                { list2.Add("Not Found");
                    return list2;
                }
                else {
                    foreach (var item in results)
                    {
                        list2.Add(item.MoNumber + "   " + item.Name);
                    }
                }
                



                return list2;
            }



            







        }





        [HttpGet]
        [Route("SearchByMoNumber/")]
        public string SearchByMoNumber(String search)
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
