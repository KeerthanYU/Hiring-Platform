import User from "./User.js";
import Job from "./Job.js";
import Application from "./Application.js";
import Notification from "./Notification.js";
import AuditLog from "./AuditLog.js";

// ==========================================
// 1. User <-> Job (Recruiter posting jobs)
// ==========================================
User.hasMany(Job, {
    foreignKey: "createdBy",
    as: "postedJobs"
});
Job.belongsTo(User, {
    foreignKey: "createdBy",
    as: "recruiter"
});

// ==========================================
// 2. User <-> Application (Candidate applying)
// ==========================================
User.hasMany(Application, {
    foreignKey: "candidateId",
    as: "applications"
});
Application.belongsTo(User, {
    foreignKey: "candidateId",
    as: "candidate"
});

// ==========================================
// 3. User <-> Application (Recruiter receiving applications)
// ==========================================
User.hasMany(Application, {
    foreignKey: "recruiterId",
    as: "receivedApplications"
});
Application.belongsTo(User, {
    foreignKey: "recruiterId",
    as: "recruiter"
});

// ==========================================
// 4. Job <-> Application
// ==========================================
Job.hasMany(Application, {
    foreignKey: "jobId",
    as: "applications"
});
Application.belongsTo(Job, {
    foreignKey: "jobId",
    as: "job"
});

// ==========================================
// 5. User <-> Notification
// ==========================================
User.hasMany(Notification, {
    foreignKey: "userId"
});
Notification.belongsTo(User, {
    foreignKey: "userId"
});

// ==========================================
// 6. Application <-> Notification
// ==========================================
Application.hasMany(Notification, {
    foreignKey: "relatedId",
    constraints: false,
    scope: { type: "APPLICATION" },
});
Notification.belongsTo(Application, {
    foreignKey: "relatedId",
    constraints: false,
});

// ==========================================
// 7. User <-> AuditLog (Admin actions)
// ==========================================
User.hasMany(AuditLog, {
    foreignKey: "adminId",
    as: "adminLogs"
});
AuditLog.belongsTo(User, {
    foreignKey: "adminId",
    as: "admin"
});

export default { User, Job, Application, Notification, AuditLog };

