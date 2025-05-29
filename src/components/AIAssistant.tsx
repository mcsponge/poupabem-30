
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
      <Card className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-xl border-white/20 h-full flex flex-col overflow-hidden shadow-2xl">
        <div className="p-4 flex items-center justify-between cursor-pointer" onClick={toggleExpanded}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-semibold text-white">IA Assistente</span>
              {!isExpanded && analysis.insights.length > 0 && (
                <Badge className="ml-2 bg-yellow-400/20 text-yellow-200 text-xs animate-pulse border-yellow-400/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Novos insights
                </Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10" onClick={(e) => { e.stopPropagation(); toggleExpanded(); }}>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
        
        {isExpanded && (
          <>
            <Separator className="bg-white/20" />
            
            <div className="flex-1 overflow-y-auto p-4">
              {analysis.loading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin" />
                  <p className="text-sm text-white/80 text-center">Analisando suas despesas com IA...</p>
                </div>
              ) : expenses.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                  <div className="p-4 rounded-full bg-white/10">
                    <MessageSquare className="h-8 w-8 text-white/70" />
                  </div>
                  <p className="text-white/80 text-sm">Adicione despesas para receber análises inteligentes personalizadas</p>
                </div>
              ) : (
                <Tabs defaultValue="insights" className="w-full">
                  <TabsList className="w-full bg-white/10 border-white/20 mb-4">
                    <TabsTrigger value="insights" className="flex-1 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Insights
                    </TabsTrigger>
                    <TabsTrigger value="suggestions" className="flex-1 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Dicas
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="insights" className="mt-0 space-y-3">
                    {analysis.insights.map((insight, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm animate-fade-in"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="flex gap-3">
                          <Lightbulb className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                          <p className="text-sm text-white/90 leading-relaxed">{insight}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="suggestions" className="mt-0 space-y-3">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm animate-fade-in"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="flex gap-3">
                          <Sparkles className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                          <p className="text-sm text-white/90 leading-relaxed">{suggestion}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              )}
            </div>
            
            <Separator className="bg-white/20" />
            
            <div className="p-4">
              <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-medium shadow-lg">
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
