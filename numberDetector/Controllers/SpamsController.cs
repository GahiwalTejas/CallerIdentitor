using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using numberDetector.Models;

namespace numberDetector.Controllers
{
    public class SpamsController : ApiController
    {
        private TrueCallerEntities1 db = new TrueCallerEntities1();

        // GET: api/Spams
        public IQueryable<Spam> GetSpams()
        {
            return db.Spams;
        }

        // GET: api/Spams/5
        [ResponseType(typeof(Spam))]
        public IHttpActionResult GetSpam(int id)
        {
            Spam spam = db.Spams.Find(id);
            if (spam == null)
            {
                return NotFound();
            }

            return Ok(spam);
        }

        // PUT: api/Spams/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSpam(int id, Spam spam)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != spam.SpamId)
            {
                return BadRequest();
            }

            db.Entry(spam).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Spams
        [ResponseType(typeof(Spam))]
        public IHttpActionResult PostSpam(Spam spam)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Spams.Add(spam);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = spam.SpamId }, spam);
        }

        // DELETE: api/Spams/5
        [ResponseType(typeof(Spam))]
        public IHttpActionResult DeleteSpam(int id)
        {
            Spam spam = db.Spams.Find(id);
            if (spam == null)
            {
                return NotFound();
            }

            db.Spams.Remove(spam);
            db.SaveChanges();

            return Ok(spam);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SpamExists(int id)
        {
            return db.Spams.Count(e => e.SpamId == id) > 0;
        }
    }
}