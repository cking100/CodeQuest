'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlgorithmVisualizer } from '@/components/visualizers/algorithm-visualizer';
import { DataStructureVisualizer } from '@/components/visualizers/data-structure-visualizer';
import { ExecutionFlowVisualizer } from '@/components/visualizers/execution-flow-visualizer';

export default function view() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Visuals</CardTitle>
        <CardDescription>Visualize complex </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="algorithms" className="name">
          <TabsList className="tab">
            <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
            <TabsTrigger value="data-structures">Data Structures</TabsTrigger>
            <TabsTrigger value="execution-flow">Execution Flow</TabsTrigger>
          </TabsList>
          <TabsContent value="algorithms">
            <AlgorithmVisualizer />
          </TabsContent>
          <TabsContent value="data-structures">
            <DataStructureVisualizer />
          </TabsContent>
        <TabsContent value="execution-flow">
            <ExecutionFlowVisualizer />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
