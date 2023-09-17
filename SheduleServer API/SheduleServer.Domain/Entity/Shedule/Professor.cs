using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SheduleServer.Domain.Entity.Shedule
{
	public class Professor
	{
        public decimal Id { get; set; }
        public string Name { get; set; }

		public virtual IEnumerable<SheduleLessonProfessor> SheduleLessonProfessors { get; set; }
	}
}
