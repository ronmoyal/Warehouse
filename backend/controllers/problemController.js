import Problem from '../model/Problem.js';


const addProblem = async (req, res) => {
    const { serialNumber, note } = req.body;
    const userid = req.user;
    
    if (note === '') {
      return res.status(409).json({ message: 'The field cannot be empty' });
    }
    try {
        const result = await Problem.create({
          serialNumber: serialNumber,
          note: note,
          userEmail: userid,
        });
        res.status(201).json({ message: `The problem was reported successfully!` });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };
  export default { addProblem };

  
