namespace TaskManagementApi.Models{
    public class TaskItem
    {
        public int Id {get; set;}
        public string Name {get; set;} = "New Task";
        public bool Done {get; set;}
    }
}
