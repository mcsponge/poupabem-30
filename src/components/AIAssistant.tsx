
import React, { useState, useEffect } from 'react';
import { Bot, ChevronDown, ChevronUp, Lightbulb, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Expense, ExpenseSummary, AIAnalysis } from '@/types';
import { analyzeExpenses } from '@/utils/aiUtils';

interface AIAssistantProps {
  expenses: Expense[];
  summary: ExpenseSummary;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ expenses, summary }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis>({ insights: [], suggestions: [], loading: true });
  
  useEffect(() => {
    if (expenses.length > 0) {
      setAnalysis(prev => ({ ...prev, loading: true }));
      
      analyzeExpenses(expenses, summary)
        .then(result => {
          setAnalysis({ ...result, loading: false });
        });
    } else {
      setAnalysis({ insights: [], suggestions: [], loading: false });
    }
  }, [expenses, summary]);

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className={`fixed bottom-6 right-6 transition-all duration-500 z-50 w-80 ${isExpanded ? 'h-[520px]' : 'h-16'}`}>
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl h-full flex flex-col overflow-hidden">
        <div className="p-4 flex items-center justify-between cursor-pointer" onClick={toggleExpanded}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">IA Assistente</span>
              {!isExpanded && analysis.insights.length > 0 && (
                <Badge className="ml-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs animate-pulse border-yellow-200 dark:border-yellow-800">
                  <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
                  Novos insights
                </Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={(e) => { e.stopPropagation(); toggleExpanded(); }}>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
        
        {isExpanded && (
          <>
            <Separator className="bg-gray-200 dark:bg-gray-700" />
            
            <div className="flex-1 overflow-y-auto p-4">
              {analysis.loading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-purple-500 animate-spin" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Analisando suas despesas com IA...</p>
                </div>
              ) : expenses.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                  <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-700">
                    <MessageSquare className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Adicione despesas para receber análises inteligentes personalizadas</p>
                </div>
              ) : (
                <Tabs defaultValue="insights" className="w-full">
                  <TabsList className="w-full bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 mb-4">
                    <TabsTrigger value="insights" className="flex-1 text-gray-700 dark:text-gray-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">
                      <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                      Insights
                    </TabsTrigger>
                    <TabsTrigger value="suggestions" className="flex-1 text-gray-700 dark:text-gray-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">
                      <Sparkles className="h-4 w-4 mr-2 text-emerald-500" />
                      Dicas
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="insights" className="mt-0 space-y-3">
                    {analysis.insights.map((insight, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 animate-fade-in"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="flex gap-3">
                          <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{insight}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="suggestions" className="mt-0 space-y-3">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 animate-fade-in"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="flex gap-3">
                          <Sparkles className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{suggestion}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              )}
            </div>
            
            <Separator className="bg-gray-200 dark:bg-gray-700" />
            
            <div className="p-4">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium shadow-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Obter Mais Insights
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default AIAssistant;
