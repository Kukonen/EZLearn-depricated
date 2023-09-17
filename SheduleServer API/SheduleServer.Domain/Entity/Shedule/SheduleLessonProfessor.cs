using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SheduleServer.Domain.Entity.Shedule
{
	public class SheduleLessonProfessor
	{
		public int Id { get; set; }

        public int SheduleLessonId { get; set; }
        public SheduleLesson SheduleLesson { get; set; }

        public int ProfessorId { get; set; }
        public Professor Professor { get; set; }
    }
}
