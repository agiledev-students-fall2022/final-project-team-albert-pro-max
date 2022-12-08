db.users.find({ cart: { $elemMatch: { course: recitation_prev["_id"], watch: true } } });
db.users.find({ cart: { $elemMatch: { course: ObjectId("6391903ff285eccfc37a06de"), watch: false } } });


db.courses.findOne({ class_number: "9147" });
db.courses.findOne({ _id: ObjectId("6386d24385e9ee4240cc1002"), });
db.courses.update({ _id: ObjectId("6386d24385e9ee4240cc1002") }, { $set: { class_status: "Open" } });


db.recitations.findOne({ lecture_id: ObjectId("6386d24385e9ee4240cc1002"), });
db.recitations.findOne({ _id: ObjectId("6386d24385e9ee4240cc1003"), });
db.recitations.update({ _id: ObjectId("6386d24385e9ee4240cc1003") }, { $set: { class_status: "Open" } });
