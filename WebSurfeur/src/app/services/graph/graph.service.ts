import { Injectable } from '@angular/core';
import { Graph } from 'src/app/models/Graph/graph';
import { Tree } from 'src/app/models/Graph/Tree/tree';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graph: Graph | undefined;

  constructor() { }

  drawGraph(svg: any): void {
    this.graph?.draw(svg);
  }

  stop(): void {
    this.graph?.stop();
  }

  generateGraph(type: string, args: any[]) {
    switch (type) {
      case 'tree':
        this.graph = this.generateTree(args[0], args[1]);
        break;
      case 'conf2':
        this.graph = this.generateTree(args[0], 2);
        break;
      case 'conf3':
        this.graph = this.generateTree(args[0], args[1]);
        break;
    }
  }

  generatesNodes(n: number): any[] {
    let nodes = [];
    for(let i=0 ; i < n ; ++i) {
      nodes.push({
        index: i,
      });
    }
    return nodes;
  }

  generateTree(size: number, arity: number): Tree {

    let nodes = this.generatesNodes(size);
    let links = [];

    for(let i = 0 ; i < size ; ++i) {
      for(let j = 1 ; j <= arity && (i*arity)+j < size ; ++j) {
        links.push({
          source: i,
          target: (i*arity) + j
        });
      }
    }

    return new Tree(nodes, links);
  }

}
