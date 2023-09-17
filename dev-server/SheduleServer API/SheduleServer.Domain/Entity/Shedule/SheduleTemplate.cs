using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SheduleServer.Domain.Entity.Shedule
{
	public class SheduleTemplate
	{
        public long Id { get; set; }
		public string Name { get; set; }

        public int GroupId { get; set; }
        public Group Group { get; set; }

		public IEnumerable<SheduleDay> SheduleDays { get; set; }
	}
}
