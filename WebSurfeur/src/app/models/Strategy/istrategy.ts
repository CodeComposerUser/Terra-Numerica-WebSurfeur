import { Graph } from "../Graph/graph";

export abstract class Strategy {
    abstract turnAction(graph: Graph, goat_position_index: number, cabbage_positions_index: number[]): void;

    delayTurnAction(graph: Graph, goat_position_index: number, cabbage_positions_index: number[]): void {
        setTimeout(() => {
            this.turnAction(graph, goat_position_index, cabbage_positions_index)
        }, 2000)
    }
}