using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class TheoryFile
    {
        public Guid Id { get; set; }

        public string Url { get; set; }

        public string Format { get; set; }

        public Guid TheoryId { get; set; }

        public Theory Theory { get; set; }
    }
}
