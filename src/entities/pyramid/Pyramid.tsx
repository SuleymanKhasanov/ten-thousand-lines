import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import React from 'react';
import { ThreeElements } from '@react-three/fiber';

interface GLTFResult {
  nodes: {
    Object_4: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_14: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_18: THREE.Mesh;
    Object_20: THREE.Mesh;
    Object_22: THREE.Mesh;
    Object_24: THREE.Mesh;
  };
  materials: {
    ['Material.018']: THREE.MeshPhysicalMaterial;
    ['Material.019']: THREE.MeshPhysicalMaterial;
  };
}



export const Pyramid: React.FC<ThreeElements['group']> = (
  props,
) => {
  const gltf = useGLTF('/3d/scene.gltf');
  const { nodes, materials } = gltf as unknown as GLTFResult;

  // Модифицируем материалы для читаемости, без металла
  const colorMaterial018 = materials['Material.018'].clone();
  colorMaterial018.color.set('#ff9999'); // Светло-розовый для базы
  colorMaterial018.metalness = 0; // Убираем металлический эффект
  colorMaterial018.roughness = 0.5; // Матовая поверхность

  const colorMaterial019 = materials['Material.019'].clone();
  colorMaterial019.color.set('#000'); // Чуть темнее розовый для деталей
  colorMaterial019.metalness = 0; // Убираем металлический эффект
  colorMaterial019.roughness = 0.5; // Матовая поверхность

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={colorMaterial018}
        position={[0, 2.53, 0]}
        scale={[3.525, 2.518, 3.525]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={colorMaterial019}
        position={[0, 3.971, 0.883]}
        rotation={[0.995, 0, 0]}
        scale={0.215}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_8.geometry}
        material={colorMaterial019}
        position={[0, 3.094, 1.47]}
        rotation={[0.995, 0, 0]}
        scale={0.318}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_10.geometry}
        material={colorMaterial019}
        position={[0, 2.3, 2]}
        rotation={[0.995, 0, 0]}
        scale={0.337}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_12.geometry}
        material={colorMaterial019}
        position={[0, 1.306, 2.66]}
        rotation={[0.995, 0, 0]}
        scale={0.504}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_14.geometry}
        material={colorMaterial019}
        position={[0, 0.311, 3.32]}
        rotation={[0.995, 0, 0]}
        scale={0.61}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_16.geometry}
        material={colorMaterial019}
        position={[-3.26, 0.421, 0]}
        rotation={[Math.PI / 2, -0.576, Math.PI / 2]}
        scale={0.359}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_18.geometry}
        material={colorMaterial019}
        position={[-2.585, 1.421, 0]}
        rotation={[Math.PI / 2, -0.576, Math.PI / 2]}
        scale={0.215}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_20.geometry}
        material={colorMaterial019}
        position={[-1.92, 2.421, 0]}
        rotation={[Math.PI / 2, -0.576, Math.PI / 2]}
        scale={0.197}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_22.geometry}
        material={colorMaterial019}
        position={[-1.29, 3.362, 0]}
        rotation={[Math.PI / 2, -0.576, Math.PI / 2]}
        scale={0.18}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_24.geometry}
        material={colorMaterial019}
        position={[-0.586, 4.419, 0]}
        rotation={[Math.PI / 2, -0.576, Math.PI / 2]}
        scale={0.172}
      />
    </group>
  );
};

useGLTF.preload('/3d/scene.gltf');
