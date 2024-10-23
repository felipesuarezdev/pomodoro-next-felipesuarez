'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCw, Ship, Coffee } from 'lucide-react';

const PomodoroTimer = () => {
  // Timer state
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [minutes, setMinutes] = useState(workTime);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // Available time options
  const workTimeOptions = [15, 20, 25, 30, 45, 60];
  const breakTimeOptions = [5, 10, 15, 20];

  // Timer effect
  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Switch between work and break
            playNotificationSound();
            setIsBreak(!isBreak);
            setMinutes(isBreak ? workTime : breakTime);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, workTime, breakTime, isBreak]);

  // Play notification sound
  const playNotificationSound = () => {
    try {
      const audio = new Audio('/notification.mp3');
      audio.play();
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(workTime);
    setSeconds(0);
  };

  // Format time display
  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          {isBreak ? 'Tómate un descanso!' : 'Tiempo de trabajo'}
        </h1>

        <div className="text-7xl font-bold text-center text-gray-900 font-mono">
          {formatTime(minutes, seconds)}
        </div>

        <div className="flex justify-center space-x-6">
          <button
            onClick={() => setIsActive(!isActive)}
            className="p-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            aria-label={isActive ? 'Pause timer' : 'Start timer'}
          >
            {isActive ? <Pause size={28} /> : <Play size={28} />}
          </button>
          <button
            onClick={resetTimer}
            className="p-4 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            aria-label="Reset timer"
          >
            <RotateCw size={28} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tiempo de trabajo
            </label>
            <div className="grid grid-cols-3 gap-2">
              {workTimeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setWorkTime(time);
                    if (!isBreak) {
                      setMinutes(time);
                      setSeconds(0);
                    }
                  }}
                  className={`p-3 rounded-lg transition-all ${
                    workTime === time
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {time}m
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tiempo de descanso
            </label>
            <div className="grid grid-cols-2 gap-2">
              {breakTimeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setBreakTime(time);
                    if (isBreak) {
                      setMinutes(time);
                      setSeconds(0);
                    }
                  }}
                  className={`p-3 rounded-lg transition-all ${
                    breakTime === time
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {time}m
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center text-gray-500 pt-4">
        {isBreak ? <Coffee className="mr-2" size={20} /> : <Ship className="mr-2" size={20} />}
          <span className="text-sm font-medium">
            {isBreak ? 'Hora de recargar!' : 'Mantén la concentración!'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;