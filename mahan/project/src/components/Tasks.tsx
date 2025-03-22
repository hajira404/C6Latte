import React, { useState } from 'react';
import { Camera, Check, Leaf, Car, Train, Trash2, Upload, ArrowLeft, Ban } from 'lucide-react';
import toast from 'react-hot-toast';

interface Task {
  id: string;
  icon: any;
  name: string;
  description: string;
  points: number;
  completed: boolean;
  verified: boolean;
  evidence?: string;
  metrics: {
    carbonScore?: number;
    waterSaved?: number;
    treesSaved?: number;
  };
}

interface TasksProps {
  onBack: () => void;
  updateMetrics: (metrics: any) => void;
}

export function Tasks({ onBack, updateMetrics }: TasksProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      icon: Trash2,
      name: 'Zero Waste Day',
      description: 'Go through entire day without generating any non-recyclable waste',
      points: 100,
      completed: false,
      verified: false,
      metrics: {
        waterSaved: 50
      }
    },
    {
      id: '2',
      icon: Train,
      name: 'Public Transport Usage',
      description: 'Use public transportation instead of personal vehicle',
      points: 75,
      completed: false,
      verified: false,
      metrics: {
        carbonScore: 30
      }
    },
    {
      id: '3',
      icon: Car,
      name: 'Carpooling Initiative',
      description: 'Share your ride with at least one other person',
      points: 50,
      completed: false,
      verified: false,
      metrics: {
        carbonScore: 20
      }
    },
    {
      id: '4',
      icon: Ban,
      name: 'Plastic-Free Day',
      description: 'Avoid using any single-use plastics today',
      points: 85,
      completed: false,
      verified: false,
      metrics: {
        waterSaved: 30,
        treesSaved: 1
      }
    },
    {
      id: '5',
      icon: Leaf,
      name: 'Carbon Emission Check',
      description: 'Calculate and log your daily carbon emissions',
      points: 60,
      completed: false,
      verified: false,
      metrics: {
        carbonScore: 25
      }
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [uploadingEvidence, setUploadingEvidence] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);  // Track upload count

  const handleFileUpload = async (taskId: string, file: File) => {
    setUploadingEvidence(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          const newUploadCount = uploadCount + 1;
          setUploadCount(newUploadCount);

          // Add or deduct points based on upload count
          let pointsChange = 0;
          if (newUploadCount <= 2) {
            pointsChange = task.points; // Add points for first 2 uploads
            toast.success(`+${pointsChange} points added! 🎉`);
          } else if (newUploadCount <= 4) {
            pointsChange = -task.points; // Deduct points for the next 2 uploads
            toast.error(`-${Math.abs(pointsChange)} points deducted! 😢`);
          }

          // Update metrics
          updateMetrics((prevMetrics: any) => ({
            ...prevMetrics,
            carbonScore: (prevMetrics.carbonScore || 0) + (task.metrics.carbonScore || 0),
            waterSaved: (prevMetrics.waterSaved || 0) + (task.metrics.waterSaved || 0),
            treesSaved: (prevMetrics.treesSaved || 0) + (task.metrics.treesSaved || 0),
            points: (prevMetrics.points || 0) + pointsChange
          }));

          return {
            ...task,
            completed: true,
            verified: true,
            evidence: URL.createObjectURL(file)
          };
        }
        return task;
      });

      setTasks(updatedTasks);
    } catch (error) {
      toast.error('Failed to verify evidence. Please try again.');
    } finally {
      setUploadingEvidence(false);
      setSelectedTask(null);
    }
  };

  const handleTaskClick = (task: Task) => {
    if (task.completed) {
      toast('Task already completed!', { icon: '🎉' });
      return;
    }
    setSelectedTask(task);
  };

  if (selectedTask) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
        <button
          onClick={() => setSelectedTask(null)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Tasks
        </button>
        
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-emerald-100 rounded-full mb-4">
            <selectedTask.icon className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{selectedTask.name}</h2>
          <p className="text-gray-600 mt-2">{selectedTask.description}</p>
          <div className="mt-2 text-emerald-600 font-semibold">
            {selectedTask.points} points
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {selectedTask.metrics.carbonScore && (
              <div>Carbon Score: +{selectedTask.metrics.carbonScore}</div>
            )}
            {selectedTask.metrics.waterSaved && (
              <div>Water Saved: +{selectedTask.metrics.waterSaved} liters</div>
            )}
            {selectedTask.metrics.treesSaved && (
              <div>Trees Saved: +{selectedTask.metrics.treesSaved}</div>
            )}
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            id="evidence"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFileUpload(selectedTask.id, file);
              }
            }}
          />
          <label
            htmlFor="evidence"
            className="flex flex-col items-center cursor-pointer"
          >
            <Camera className="w-12 h-12 text-gray-400 mb-4" />
            <span className="text-gray-600">Upload photo/video evidence</span>
            <span className="text-sm text-gray-500 mt-2">
              Supports images and videos
            </span>
          </label>
        </div>

        {uploadingEvidence && (
          <div className="mt-4 text-center text-emerald-600">
            <div className="animate-spin inline-block">
              <Upload className="w-6 h-6" />
            </div>
            <p className="mt-2">Verifying evidence...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Daily Tasks</h2>
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleTaskClick(task)}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between cursor-pointer"
          >
            <span>{task.name}</span>
            {task.completed && <Check className="text-emerald-500 w-6 h-6" />}
          </div>
        ))}
      </div>
    </div>
  );
}