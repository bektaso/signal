'use client'

import { useEffect, useState } from 'react'

export type GPUTier = 'high' | 'medium' | 'low'

export function useGPUTier(): GPUTier {
    const [tier, setTier] = useState<GPUTier>('low')

    useEffect(() => {
        // Check for mobile devices first
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )

        if (isMobile) {
            setTier('low')
            return
        }

        // Try to detect GPU capability via WebGL
        try {
            const canvas = document.createElement('canvas')
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

            if (!gl) {
                setTier('low')
                return
            }

            const webgl = gl as WebGLRenderingContext
            const debugInfo = webgl.getExtension('WEBGL_debug_renderer_info')

            if (debugInfo) {
                const renderer = webgl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
                const rendererLower = renderer.toLowerCase()

                // High-end GPU detection
                if (
                    rendererLower.includes('nvidia') ||
                    rendererLower.includes('radeon') ||
                    rendererLower.includes('geforce') ||
                    rendererLower.includes('rtx') ||
                    rendererLower.includes('gtx')
                ) {
                    setTier('high')
                    return
                }

                // Intel integrated but recent
                if (rendererLower.includes('intel') && rendererLower.includes('iris')) {
                    setTier('medium')
                    return
                }
            }

            // Check for hardware concurrency (CPU cores) as fallback
            const cores = navigator.hardwareConcurrency || 2
            if (cores >= 8) {
                setTier('high')
            } else if (cores >= 4) {
                setTier('medium')
            } else {
                setTier('low')
            }
        } catch {
            setTier('low')
        }
    }, [])

    return tier
}
