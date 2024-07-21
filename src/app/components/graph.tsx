import React, { useEffect, useRef, useState } from "react";
import { WalletData } from "@/backend/moralis/walletHistoryMoralis";
import { DataSet, Network, Data, Node, Edge } from "vis-network/standalone";

interface GraphProps {
  walletID: string;
  walletData: WalletData;
}

const Graph: React.FC<GraphProps> = ({ walletID, walletData }) => {
  const networkRef = useRef<HTMLDivElement>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [networkInstance, setNetworkInstance] = useState<Network | null>(null);

  useEffect(() => {
    if (networkRef.current) {
      // Define nodes
      const nodesData: Node[] = [
        { id: 1, label: `Node 0`, color: "#3f3f3f" },
        { id: 2, label: `Node 1`, color: "#3f3f3f" },
      ];

      // Define edges
      const edgesData: Edge[] = [
        { from: 1, to: 2 },
      ];

      // Create DataSet instances
      const nodes = new DataSet(nodesData);
      const edges = new DataSet(edgesData);

      // Network data
      const data: Data = {
        nodes: nodes, // Pass the DataSet directly
        edges: edges, // Pass the DataSet directly
      };

      // Network options
      const options = {
        layout: {
          hierarchical: false,
        },
        nodes: {
          color: "#3f3f3f",
          borderWidth: 2,
          borderColor: "#db00ff",
          font: {
            color: "#ffffff",
          },
          size: 30,
          shape: "circle",
        },
        edges: {
          color: "#ffffff",
        },
        interaction: {
          zoomView: false,
        },
        height: "100%",
        width: "100%",
        physics: {
          stabilization: false,
        },
      };

      const container = networkRef.current;
      const network = new Network(container, data, options);
      setNetworkInstance(network);

      network.on("selectNode", (event) => {
        const nodeId = event.nodes[0];
        if (nodeId) {
          // Update the color of the selected node
          nodes.update({ id: nodeId, color: "#db00ff" });

          // Move to the selected node
          const position = network.getPositions()[nodeId];
          network.moveTo({
            position,
            scale: 1.5,
            animation: {
              duration: 1000,
              easingFunction: "easeInOutQuad",
            },
          });

          // Reset the color of all other nodes
          nodes.get().forEach((node) => {
            if (node.id !== nodeId) {
              nodes.update({ id: node.id, color: "#3f3f3f" });
            }
          });

          // Apply glow effect to selected node
          document.querySelectorAll(".vis-network .vis-node").forEach((nodeElement) => {
            const elementId = parseInt(nodeElement.getAttribute("nodeid") || "");
            if (elementId !== nodeId) {
              (nodeElement as HTMLElement).style.boxShadow = "";
            }
          });

          const selectedNodeElement = document.querySelector(
            `.vis-network .vis-node[nodeid="${nodeId}"]`
          );
          if (selectedNodeElement) {
            (selectedNodeElement as HTMLElement).style.boxShadow =
              "0 0 10px 5px rgba(219, 0, 255, 0.7)";
          }
        }
      });

      network.on("dragEnd", () => {
        // Snap back to the selected node if there is one
        if (selectedNodeId !== null) {
          const position = network.getPositions()[selectedNodeId];
          network.moveTo({
            position,
            scale: 1.5,
            animation: {
              duration: 1000,
              easingFunction: "easeInOutQuad",
            },
          });
        }
      });

      return () => {
        network.destroy();
      };
    }
  }, [walletID, walletData, selectedNodeId]);

  return <div className="h-full" ref={networkRef}></div>;
};

export default Graph;
