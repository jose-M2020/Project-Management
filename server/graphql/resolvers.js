import Client from "../models/Client.js";
import Developer from "../models/Developer.js";
import Event from "../models/Event.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const resolvers = {
  Query: {
    projects: async () => {
        return await Project.find();
    },
    project: async (_, { _id }) => {
	  return await Project.findById(_id);
	},
    tasks: async () => {
	  return await Task.find();
	},
	task: async (_, { _id }) => {
	  return await Task.findById(_id);
	},
    clients: async () => {
	  return await Client.find();
	},
	client: async (_, { _id }) => {
	  return await Client.findById(_id);
	},
    developers: async () => {
	  return await Developer.find();
	},
	developer: async (_, { _id }) => {
	  return await Developer.findById(_id);
	},
    events: async () => {
	  return await Event.find();
	},
	event: async (_, { _id }) => {
	  return await Event.findById(_id);
	}
  },
  Mutation: {
	createProject: async (_, {
      name,
      description,
      repository,
      url,
      type,
      status,
      team,
      clientID,
      technologies
    }) => {
	  const project = new Project({
	  	name,
	  	description,
	  	repository,
	  	url,
	  	type,
	  	status,
	  	team,
	  	clientID,
	  	technologies
	  });
	  const savedProject = project.save();
	  return savedProject;
	},
    updateProject: async (_, args) => {
	  const updatedProject = await Project.findByIdAndUpdate(
	  	args._id,
	  	args,
	  	{ new: true }
	  );
	  if (!updatedProject) throw new Error("Project not found");
	  return updatedProject;
	},
	deleteProject: async (_, { _id }) => {
	  const deletedProject = await Project.findByIdAndDelete(_id);
	  if (!deletedProject) throw new Error("Project not found");
	   
	  await Task.deleteMany({projectId: _id})
	  await Event.deleteMany({projectId: _id})

	  return deletedProject;
	},
		
	createTask: async (_, {
      title,
      description,
      projectId,
      status,
      date
    }) => {
	  const projectFound = await Project.findById(projectId);
	  if (!projectFound) {
	   throw new Error("Project not found");
	  }

	  const task = new Task({
		title,
        description,
        projectId,
        status,
        date
	  });
	  const savedTask = task.save();
	  return savedTask;
	},
	updateTask: async (_, args) => {
	  const updatedTask = await Task.findByIdAndUpdate(args._id, args, {
		new: true,
	  });
	  if (!updatedTask) throw new Error("Task not found");
	    return updatedTask;
	},
    deleteTask: async (_, { _id }) => {
	  const deletedTask = await Task.findByIdAndDelete(_id);
	  if (!deletedTask) throw new Error("Task not found");
	  return deletedTask;
	},

	createClient: async (_, {
	  firstname,
	  lastname,
	  email,
	  phone,
	  company: {
		name,
    	website,
    	country,
    	state,
    	city
	  }
    }) => {
	  const client = new Client({
		firstname,
	  	lastname,
	  	email,
	  	phone,
		company: {
		  name,
    	  website,
    	  country,
    	  state,
    	  city
		}
	  });
	  const savedClient = client.save();
	  return savedClient;
	},
	updateClient: async (_, args) => {
	  const updatedClient = await Client.findByIdAndUpdate(args._id, args, {
		new: true,
	  });
	  if (!updatedClient) throw new Error("Client not found");
	    return updatedClient;
	},
    deleteClient: async (_, { _id }) => {
	  const deletedClient = await Client.findByIdAndDelete(_id);
	  if (!deletedClient) throw new Error("Client not found");
	  return deletedClient;
	},

	createDeveloper: async (_, {
	  firstname,
	  lastname,
	  email,
	  phone,
	  position
    }) => {
	  const dev = new Developer({
		firstname,
	  	lastname,
	  	email,
	  	phone,
		position
	  });
	  const savedDev = dev.save();
	  return savedDev;
	},
	updateDeveloper: async (_, args) => {
	  const updatedDev = await Developer.findByIdAndUpdate(args._id, args, {
		new: true,
	  });
	  if (!updatedDev) throw new Error("Developer not found");
	  return updatedDev;
	},
    deleteDeveloper: async (_, { _id }) => {
	  const deletedDev = await Developer.findByIdAndDelete(_id);
	  if (!deletedDev) throw new Error("Developer not found");
	  return deletedDev;
	},

	createEvent: async (_, {
	  title,
	  description,
	  date,
	  notify,
	  projectId
    }) => {
	  const event = new Event({
		title,
		description,
		date,
		notify,
		projectId
	  });
	  const savedEvent = event.save();
	  return savedEvent;
	},
	updateEvent: async (_, args) => {
	  const updatedEvent = await Event.findByIdAndUpdate(args._id, args, {
		new: true,
	  });
	  if (!updatedEvent) throw new Error("Event not found");
	  return updatedEvent;
	},
    deleteEvent: async (_, { _id }) => {
	  const deletedEvent = await Event.findByIdAndDelete(_id);
	  if (!deletedEvent) throw new Error("Event not found");
	  return deletedEvent;
	},
  },
  Project: {
    tasks: async (parent) => {
	  return await Task.find({ projectId: parent._id });
	}
  },
  Task: {
	project: async (parent) => {
	  return await Project.findById(parent.projectId);
	}
  }
}