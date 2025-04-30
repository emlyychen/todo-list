using Microsoft.AspNetCore.Mvc;
using TaskManagementApi.Data;
using TaskManagementApi.Models;

namespace TaskManagementApi.Models
{
    [ApiController]
    [Route("api/[controller]")] // "api/tasks" --> [controller] name of controller - Controller
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // ActionResult<T> is a wrapper provided by ASP.NET Core that allows a controller action to return either:
        // 1. A successful result with value type T
        // 2. A different HTTP response (e.g., NotFound(), BadRequest())


        // GET: /api/tasks/
        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetAllTasks()
        {
            return _context.Tasks.ToList();
        }

        // GET: /api/tasks/completed/
        [HttpGet("completed")]
        public ActionResult<IEnumerable<TaskItem>> GetCompletedTasks()
        {
            return _context.Tasks.Where(t => t.Done == true).ToList();
        }

        // GET: /api/tasks/upcoming/
        [HttpGet("upcoming")]
        public ActionResult<IEnumerable<TaskItem>> GetUpcomingTasks()
        {
            var upcomingTasks = _context.Tasks.Where(t => t.Done == false).ToList();
            return Ok(upcomingTasks);
        }

        //GET: /api/tasks/5
        [HttpGet("{id}")]
        public ActionResult<TaskItem> GetTaskById(int id)
        {
            var task  = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null){
                return NotFound();
            }
            return task;
        }

        // POST: /api/tasks/create/
        // The request body should contain a JSON representation of a TaskItem
        //  ex: If request body contains {Id: 1, Name: "Buy Groceries", Done: False} --> newTask has these attributes
        [HttpPost("create")]
        public ActionResult<TaskItem> CreateTask([FromBody] TaskItem newTask)
        {
            newTask.Done = false;   // ensure new tasks are not done by default

            if(newTask.Name == ""){
                newTask.Name = "New Task";
            }

            _context.Tasks.Add(newTask);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetTaskById), new {id = newTask.Id}, newTask);

        }

        [HttpGet("complete/{id}")]
        public ActionResult<TaskItem> CompleteTask(int id)
        {
            var task  = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null){
                return NotFound();
            }

            task.Done = true;

            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("delete/{id}")]
        public ActionResult DeleteTask(int id)
        {
            var task  = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null){
                return NotFound();
            }

            _context.Tasks.Remove(task);
            _context.SaveChanges();

            return Ok();
        }

    }
}