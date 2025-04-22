
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, Send, History, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatProps {
  datasetName?: string;
}

const AIChat = ({ datasetName }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add initial message on component mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            datasetName
              ? `¡Hola! Soy tu asistente de análisis de datos para el dataset "${datasetName}". ¿En qué puedo ayudarte? Puedes preguntarme sobre estadísticas, tendencias, o pedirme que genere visualizaciones basadas en tus datos.`
              : "¡Hola! Soy tu asistente de análisis de datos. Sube un dataset para comenzar a analizarlo juntos.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length, datasetName]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let responseText = "";
      
      if (input.toLowerCase().includes("estadística") || input.toLowerCase().includes("media") || input.toLowerCase().includes("promedio")) {
        responseText = "Basado en el análisis estadístico del dataset, las ventas tienen una media de 9,637.50 y una mediana de 9,550.00. La región Norte tiene las ventas promedio más altas (11,275.00), mientras que la región Oeste tiene las más bajas (8,025.00).";
      } else if (input.toLowerCase().includes("gráfico") || input.toLowerCase().includes("visualización") || input.toLowerCase().includes("barras")) {
        responseText = "He generado un gráfico de barras que muestra las ventas por región. La región Norte tiene las ventas más altas, seguida por Este, Sur y Oeste. ¿Te gustaría ver este gráfico o prefieres otra visualización como un gráfico de líneas o un diagrama de dispersión?";
      } else if (input.toLowerCase().includes("tendencia") || input.toLowerCase().includes("patrón") || input.toLowerCase().includes("correlación")) {
        responseText = "Analizando los datos, he detectado una correlación positiva (0.82) entre las ventas y las unidades vendidas. También observo que la categoría 'Electrónica' tiene las ventas promedio más altas (9,400), seguida por 'Hogar' (9,325) y 'Ropa' (9,175).";
      } else if (input.toLowerCase().includes("insight") || input.toLowerCase().includes("hallazgo") || input.toLowerCase().includes("destacado")) {
        responseText = "Aquí hay tres insights importantes del dataset:\n\n1. La región Norte tiene un 24% más de ventas que la región Oeste.\n2. Los días 3 y 4 muestran un incremento del 18% en ventas comparado con los días 1 y 2.\n3. Existe una fuerte correlación entre unidades vendidas y el total de ventas (r=0.82).";
      } else {
        responseText = "Analizando tu dataset, puedo observar patrones interesantes en las ventas por región y categoría. La región Norte tiene el mejor rendimiento, mientras que los productos de Electrónica generan el mayor ingreso promedio. ¿Te gustaría explorar alguna visualización específica o análisis estadístico para profundizar en estos datos?";
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Example suggested queries
  const suggestedQueries = [
    "Muéstrame las estadísticas básicas del dataset",
    "Genera un gráfico de barras de ventas por región",
    "¿Qué correlaciones existen entre las variables?",
    "Dime los 3 insights más importantes del dataset"
  ];

  return (
    <Card className="flex flex-col h-full border shadow-sm">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-insight-500" />
          Asistente de análisis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex", {
                  "justify-end": message.role === "user",
                })}
              >
                <div
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <Avatar className={message.role === "assistant" ? "bg-primary" : "bg-insight-500"}>
                    {message.role === "assistant" ? (
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <BarChart3 className="h-5 w-5" />
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback className="bg-insight-500 text-primary-foreground">
                        U
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={cn(
                      "rounded-lg px-4 py-3 text-sm",
                      message.role === "assistant"
                        ? "bg-muted"
                        : "bg-insight-500 text-primary-foreground"
                    )}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    <span className="text-xs opacity-50 mt-1 block text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex">
                <div className="flex gap-3 max-w-[85%]">
                  <Avatar className="bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <BarChart3 className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-3 text-sm bg-muted flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Analizando datos...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {messages.length <= 1 && !isLoading && (
          <div className="px-4 py-3 border-t">
            <h3 className="text-sm font-medium mb-2">Preguntas sugeridas:</h3>
            <div className="flex flex-wrap gap-2">
              {suggestedQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    setInput(query);
                    inputRef.current?.focus();
                  }}
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t mt-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Pregunta sobre tus datos..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
