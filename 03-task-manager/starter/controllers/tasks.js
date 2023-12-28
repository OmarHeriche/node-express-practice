const task = require("../modules/task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await task.find({});
    res
      .status(200)
      .json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const createTask = async (req, res) => {
  try {
    const myTask = await task.create(req.body);
    res.status(201).json({ myTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const myTask = await task.findOne({ _id: taskId });
    if (!myTask) {
      return res.status(404).json({ msg: `no task with id: ${taskId}` });
    }
    res.status(200).json({ task: myTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const myTask = await task.findOneAndDelete({ _id: taskId });
    if (!myTask) {
      return res
        .status(404)
        .send({ msj: `no task found for the id : ${taskId}` });
    }
    res.status(200).json({ myTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const myTask = await task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!myTask) {
      return res
        .status(404)
        .send({ msj: `no task found for the id : ${taskId}` });
    }
    res.status(200).json({ id: taskId, data: myTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
//?         exporting
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
