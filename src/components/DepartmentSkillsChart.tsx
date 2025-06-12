import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Skill {
  name: string;
  level: number;
}

interface DepartmentSkillsChartProps {
  department: string;
  currentSkills: Skill[];
  requiredSkills: Skill[];
}

const DepartmentSkillsChart: React.FC<DepartmentSkillsChartProps> = ({ 
  department, 
  currentSkills, 
  requiredSkills 
}) => {
  const chartRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clear any previous chart
    d3.select(chartRef.current).selectAll('*').remove();
    
    const margin = { top: 30, right: 120, bottom: 60, left: 60 }; // Increased right margin for legend
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Set up scales
    const x = d3.scaleBand()
      .domain(currentSkills.map(d => d.name))
      .range([0, width])
      .padding(0.2);
    
    const y = d3.scaleLinear()
      .domain([0, 5])
      .range([height, 0]);
    
    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '12px');
    
    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '12px');
    
    // Add Y axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .text('Skill Level (1-5)');
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text(`${department} Department Skills`);
    
    // Create a merged data array for easier rendering
    const chartData = currentSkills.map(cs => {
      const rs = requiredSkills.find(r => r.name === cs.name);
      return {
        name: cs.name,
        current: cs.level,
        required: rs ? rs.level : 0
      };
    });
    
    // Draw current skill bars
    svg.selectAll('.bar-current')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'bar-current')
      .attr('x', d => x(d.name) as number)
      .attr('width', x.bandwidth() / 2)
      .attr('y', d => y(d.current))
      .attr('height', d => height - y(d.current))
      .attr('fill', '#4F46E5')
      .attr('rx', 2); // Add rounded corners
    
    // Draw required skill bars
    svg.selectAll('.bar-required')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'bar-required')
      .attr('x', d => (x(d.name) as number) + x.bandwidth() / 2)
      .attr('width', x.bandwidth() / 2)
      .attr('y', d => y(d.required))
      .attr('height', d => height - y(d.required))
      .attr('fill', '#F97066')
      .attr('rx', 2); // Add rounded corners
    
    // Add legend with better positioning and spacing
    const legend = svg.append('g')
      .attr('transform', `translate(${width + 30}, 20)`); // Moved further right and down
    
    // Legend background
    const legendBg = legend.append('rect')
      .attr('x', -10)
      .attr('y', -10)
      .attr('width', 80)
      .attr('height', 60)
      .attr('fill', 'white')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-width', 1)
      .attr('rx', 4);
    
    // Legend for current skills
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', '#4F46E5')
      .attr('rx', 2);
    
    legend.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .text('Current')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .style('fill', '#374151');
    
    // Legend for required skills
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 25)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', '#F97066')
      .attr('rx', 2);
    
    legend.append('text')
      .attr('x', 20)
      .attr('y', 37)
      .text('Required')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .style('fill', '#374151');
    
  }, [department, currentSkills, requiredSkills]);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-card overflow-x-auto">
      <svg ref={chartRef} className="mx-auto"></svg>
    </div>
  );
};

export default DepartmentSkillsChart;