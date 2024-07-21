import React, { useEffect, useRef, useState } from "react";
import { WalletData } from "@/backend/moralis/walletHistoryMoralis";
import { DataSet, Network } from "vis-network/standalone";

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
      const nodes = new DataSet([
        { id: 1, label: `Wallet ID: ${walletID}` },
      ]);

      const edges = new DataSet([]);

      const data = {
        nodes,
        edges,
      };

      const options = {
        layout: {
          hierarchical: false,
        },
        nodes: {
          color: "#db00ff",
          borderWidth: 2,
          borderColor: "#db00ff",
          font: {
            color: "#ffffff",
          },
          size: 30,
          shape: 'circle',
        },
        edges: {
          color: "#7cdbd5",
        },
        interaction: {
          zoomView: false,
        },
        height: "500px",
        physics: {
          stabilization: false,
        },
      };

      const container = networkRef.current;
      const network = new Network(container, data, options);
      setNetworkInstance(network);

      network.on('selectNode', (event) => {
        const nodeId = event.nodes[0];
        if (nodeId) {
          setSelectedNodeId(nodeId);
          // Move to the selected node
          const position = network.getPositions()[nodeId];
          network.moveTo({
            position,
            scale: 1.5,
            animation: {
              duration: 1000,
              easingFunction: 'easeInOutQuad',
            },
          });

          // Remove glow effect from all nodes
          document.querySelectorAll('[nodeid]').forEach(nodeElement => {
            (nodeElement as HTMLElement).style.boxShadow = '';
          });

          // Apply glow effect to selected node
          const selectedNodeElement = document.querySelector(`[nodeid="${nodeId}"]`);
          if (selectedNodeElement) {
            (selectedNodeElement as HTMLElement).style.boxShadow = '0 0 10px 5px rgba(219, 0, 255, 0.7)';
          }
        }
      });

      network.on('dragEnd', () => {
        // Snap back to the selected node if there is one
        if (selectedNodeId !== null) {
          const position = network.getPositions()[selectedNodeId];
          network.moveTo({
            position,
            scale: 1.5,
            animation: {
              duration: 1000,
              easingFunction: 'easeInOutQuad',
            },
          });
        }
      });

      return () => {
        network.destroy();
      };
    }
  }, [walletID, walletData]);

  return (
    <div>
      <div ref={networkRef} style={{height: 100, position: 'relative' }}></div>
    </div>
  );
};

export default Graph;
