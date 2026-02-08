import User from "./User.js";
import Job from "./Job.js";
import Application from "./Application.js";
import Notification from "./Notification.js";

// User - Application
User.hasMany(Application, { foreignKey: "candidateId", as: "applications" });
Application.belongsTo(User, { foreignKey: "candidateId", as: "candidate" });

// Job - Application
Job.hasMany(Application, { foreignKey: "jobId" });
Application.belongsTo(Job, { foreignKey: "jobId" });

// User - Notification
User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

// Application - Notification
Application.hasMany(Notification, { foreignKey: "relatedId", constraints: false, scope: { type: 'APPLICATION' } });
Notification.belongsTo(Application, { foreignKey: "relatedId", constraints: false });

export default { User, Job, Application, Notification };
