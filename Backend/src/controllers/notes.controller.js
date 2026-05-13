import Note from "../models/notes.model.js";

const createNote = async (req, res) => {
  try {
    const { title, description, content } = req.body;

    const note = await Note.create({
      title,
      description,
      content,
      user: req.user.id,
    });

    res.status(201).json({
      message : "Note for the User has been created sucessfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    if (!notes) {
      return res.status(404).json({ message: "Note for the user not found." });
    }

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const updatedUser = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user : req.user.id
      },
      req.body,
      {
        new: true,
        runValidators : true
      },
    );

    if(!updateNote){
      return res.status(404).json({
        message : "The note for the User not found"
      });
    }

    res.status(200).json({
      message : "Updated sucessfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.json({message : "Note deleted sucessfully"});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { createNote, getNotes, updateNote, deleteNote};
