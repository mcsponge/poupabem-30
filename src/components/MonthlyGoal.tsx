
import React, { useState } from 'react';
import { Target, Edit3, Check, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/utils/expenseUtils';

interface MonthlyGoalProps {
  currentSpending: number;
}

const MonthlyGoal: React.FC<MonthlyGoalProps> = ({ currentSpending }) => {
  const [monthlyGoal, setMonthlyGoal] = useState(2000);
  const [isEditing, setIsEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState(monthlyGoal.toString());

  const progressPercentage = (currentSpending / monthlyGoal) * 100;
  const isOverBudget = currentSpending > monthlyGoal;
  const remaining = monthlyGoal - currentSpending;

  const handleSaveGoal = () => {
    const newGoal = parseFloat(tempGoal);
    if (!isNaN(newGoal) && newGoal > 0) {
      setMonthlyGoal(newGoal);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setTempGoal(monthlyGoal.toString());
    setIsEditing(false);
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Meta Mensal</h3>
        </div>
        
        {!isEditing ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSaveGoal}
              className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancelEdit}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mb-6">
          <Input
            type="number"
            value={tempGoal}
            onChange={(e) => setTempGoal(e.target.value)}
            className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            placeholder="Digite sua meta mensal"
            onKeyPress={(e) => e.key === 'Enter' && handleSaveGoal()}
          />
        </div>
      ) : (
        <div className="mb-6">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {formatCurrency(monthlyGoal)}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Meta do mês</div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2 text-gray-600 dark:text-gray-400">
          <span>Gastos atuais</span>
          <span>{progressPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget 
                ? 'bg-gradient-to-r from-red-500 to-red-600' 
                : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
            }`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Status */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatCurrency(currentSpending)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Gastos</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-semibold ${
            isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
          }`}>
            {formatCurrency(Math.abs(remaining))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {isOverBudget ? 'Acima do limite' : 'Restante'}
          </div>
        </div>
      </div>

      {isOverBudget && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
          <div className="text-sm text-red-700 dark:text-red-300">
            ⚠️ Você ultrapassou sua meta mensal em {formatCurrency(Math.abs(remaining))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default MonthlyGoal;
