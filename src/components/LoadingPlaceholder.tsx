import React from 'react'

const LoadingPlaceholder = () => {
    return (
        <div
            className="inline-block h-32 w-32 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-black"
            role="status"
        >
        </div>
    )
}

export default LoadingPlaceholder
