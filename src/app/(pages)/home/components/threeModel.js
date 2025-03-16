'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";


function RotatingModel({ modelPath }) {
    const groupRef = useRef();
    const obj = useLoader(OBJLoader, modelPath);
    const mouse = useRef({ x: 0, y: 0 });

    // 監聽滑鼠移動
    useEffect(() => {
        const handleMouseMove = (event) => {
            mouse.current.x = (event.clientX / document.documentElement.clientWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / document.documentElement.clientHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // 每幀根據滑鼠位置調整模型
    useFrame(() => {
        if (groupRef.current) {
            const targetRotation = new THREE.Vector3(
                0,// mouse.current.y * 0.5, // 控制上下移動
                mouse.current.x, // 控制左右旋轉
                0
            );
            groupRef.current.rotation.set(targetRotation.x, targetRotation.y, targetRotation.z);
        }
    });

    return (
        <group ref={groupRef}>
            <primitive object={obj} position={[0, 0, 0]} />
        </group>
    );
};

export default function ThreeModel() {
    return (
        <Canvas
            style={{ height: "100vh" }}
            camera={{
                position: [0.1, 0.5, 0.1], // 調整相機位置
                near: 0.1,
                far: 1000,
            }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 1, 1]} />
            {/* 加載模型並應用動畫 */}
            <RotatingModel modelPath="/models/comment-html.obj" />
        </Canvas>
    );
};