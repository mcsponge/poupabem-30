
import React, { useState, useEffect } from 'react';
import { Bot, ChevronDown, ChevronUp, Lightbulb, MessageSquare, X } from 'lucide-react';
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
    <div className={`fixed bottom-0 right-6 transition-all duration-300 z-20 w-80 ${isExpanded ? 'h-[500px]' : 'h-14'}`}>
      <Card className="glass border-border/50 h-full flex flex-col animate-fade-in overflow-hidden">
        <div className="p-3 flex items-center justify-between cursor-pointer" onClick={toggleExpanded}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium">FinanceAI Assistente</span>
            {!isExpanded && analysis.insights.length > 0 && (
              <Badge variant="default" className="bg-primary/90 text-xs animate-pulse">
                Nova análise
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); toggleExpanded(); }}>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
        
        {isExpanded && (
          <>
            <Separator />
            
            <div className="flex-1 overflow-y-auto p-4">
              {analysis.loading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-3">
                  <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                  <p className="text-sm text-muted-foreground">Analisando suas despesas...</p>
                </div>
              ) : expenses.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                  <div className="p-4 rounded-full bg-muted">
                    <MessageSquare className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Adicione despesas para receber análises e sugestões personalizadas</p>
                </div>
              ) : (
                <Tabs defaultValue="insights">
                  <TabsList className="w-full glass mb-4">
                    <TabsTrigger value="insights" className="flex-1">Análises</TabsTrigger>
                    <TabsTrigger value="suggestions" className="flex-1">Sugestões</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="insights" className="mt-0 space-y-3">
                    {analysis.insights.map((insight, index) => (
                      <div 
                        key={index} 
                        className="p-3 bg-background rounded-lg border border-border/50 flex gap-3 animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Lightbulb className="h-5 w-5 text-expense-blue shrink-0 mt-0.5" />
                        <p className="text-sm">{insight}</p>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="suggestions" className="mt-0 space-y-3">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div 
                        key={index} 
                        className="p-3 bg-background rounded-lg border border-border/50 flex gap-3 animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Lightbulb className="h-5 w-5 text-expense-green shrink-0 mt-0.5" />
                        <p className="text-sm">{suggestion}</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              )}
            </div>
            
            <Separator />
            
            <div className="p-4">
              <Button className="w-full">Obter Mais Insights</Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default AIAssistant;
