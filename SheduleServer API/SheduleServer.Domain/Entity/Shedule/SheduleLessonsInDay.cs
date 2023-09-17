using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SheduleServer.Domain.Entity.Shedule
{
	public class SheduleLessonsInDay
	{
        public int Id { get; set; }

        public int SheduleDayId { get; set; }
        public SheduleDay SheduleDay { get; set; }

		public int SheduleLessonId { get; set; }
		public SheduleLesson SheduleLesson { get; set; }
	}
}
