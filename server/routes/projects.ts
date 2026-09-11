import { Router, Request, Response } from 'express';

export const projectsRouter = Router();

let project = {
  id: 'proj-aquasense-1',
  challengeId: 'ch-1',
  ticketId: '#CS-8921',
  title: 'Project AquaSense: IoT-Enabled Real-time Pipeline Leak & Water Quality Telemetry',
  leadInstitute: 'IIT Delhi & DTU Joint R&D',
  trlLevel: 5,
  sprintNumber: 4,
  totalSprints: 6,
  telemetry: {
    pressureBar: 8.4,
    turbidityNTU: 4.21,
    samplingRate: '10Hz (LoRaWAN Class A)',
    ambientTemp: '27°C',
    status: 'Live Lab Rig Linked',
  },
  team: {
    students: [
      { name: 'Aarav Sharma', role: 'Lead, Embedded IoT' },
      { name: 'Sneha Roy', role: 'Cloud & ML Telemetry' },
      { name: 'Rohan Verma', role: 'STM32 Firmware' },
      { name: 'Ananya Sen', role: 'Civic Field Liaison' },
    ],
    pi: {
      name: 'Dr. K. Ramanathan',
      role: 'Professor, Env. Sciences',
      institution: 'IIT Delhi Faculty Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      quote: 'Lab validation for nephelometric calibration met ISO 7027 specifications. Proceed to field trial.',
    },
    mentor: {
      name: 'Vikram Seth',
      role: 'Principal IoT Architect',
      company: 'Siemens Civic Tech Labs',
      grantAmount: '₹7.5L Hardware Grant + Azure IoT',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    govtLead: {
      name: 'Er. S. P. Bhardwaj',
      role: 'Chief Engineer',
      dept: 'Delhi Jal Board / Ward 14',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      clearance: 'Pipeline Tap Clearance Granted (MoU Ref: DJB/2024/W14)',
    },
  },
  tasks: [
    {
      id: 'task-1',
      title: 'Calibrate optical nephelometric turbidity sensors in lab',
      owner: 'Aarav S. & Dr. Ramanathan',
      detail: 'Validated • 0.05 NTU accuracy',
      status: 'DONE',
    },
    {
      id: 'task-2',
      title: 'Develop LoRaWAN gateway packet forwarder',
      owner: 'Rohan Verma',
      detail: '868 MHz ISM Band uplink sync',
      status: 'IN_PROGRESS',
    },
    {
      id: 'task-3',
      title: 'Draft municipal API data payload format for Jal Board SCADA integration',
      owner: 'Sneha Roy & Er. Bhardwaj',
      detail: 'Under security review by Jal Board NIC',
      status: 'UNDER_REVIEW',
    },
  ],
  discussions: [
    {
      id: 'disc-1',
      author: 'Dr. K. Ramanathan',
      badge: 'PI (IIT-D)',
      role: 'Academic PI',
      time: '10:45 AM',
      message: 'Aarav, please ensure the nephelometric calibration formula in the microcontroller accounts for high ferric oxide sediments prevalent in the Sangam Vihar subsurface pipeline.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'disc-2',
      author: 'Vikram Seth',
      badge: 'Siemens Mentor',
      role: 'Industry Mentor',
      time: '11:15 AM',
      message: 'Agreed with Dr. Ramanathan. I have pushed an edge filtering script in branch feature/kalman-turbidity. It stabilizes baseline drift across 12-hour thermal swings.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
  ],
  artifacts: [
    {
      name: 'AquaSense_Architecture_v1.4.pdf',
      size: '2.8 MB',
      type: 'PDF',
      desc: 'Signed by PI Dr. Ramanathan',
    },
    {
      name: 'Field_Sample_Test_Results_Ward14.csv',
      size: '412 KB',
      type: 'CSV',
      desc: 'Baseline Telemetry Data Stream',
    },
  ],
};

projectsRouter.get('/active', (req: Request, res: Response) => {
  res.json({ success: true, project });
});

projectsRouter.post('/:id/tasks', (req: Request, res: Response) => {
  const { title, owner, detail } = req.body;
  const newTask = {
    id: `task-${Date.now()}`,
    title,
    owner: owner || 'Student Fellow',
    detail: detail || 'Active sprint milestone',
    status: 'IN_PROGRESS' as const,
  };
  project.tasks.push(newTask);
  res.status(201).json({ success: true, task: newTask });
});

projectsRouter.patch('/:id/tasks/:taskId', (req: Request, res: Response): void => {
  const { taskId } = req.params;
  const { status } = req.body;

  const task = project.tasks.find((t) => t.id === taskId);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  task.status = status;
  res.json({ success: true, task });
});

projectsRouter.post('/:id/discussions', (req: Request, res: Response) => {
  const { author, badge, role, message, avatar } = req.body;
  const newMsg = {
    id: `disc-${Date.now()}`,
    author: author || 'Team Member',
    badge: badge || 'Innovator',
    role: role || 'STUDENT',
    time: 'Just now',
    message,
    avatar: avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  };
  project.discussions.push(newMsg);
  res.status(201).json({ success: true, discussion: newMsg });
});