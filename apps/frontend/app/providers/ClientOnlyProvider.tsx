// This provider would help prevent hydration errors with Wagmi

'use client';
import React, { useState, useEffect } from 'react';
export default function ClientOnlyProvider({ children }: { children: React.ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, [])

    if (!hasMounted) return null;

    return (
        <div>
            {children}
        </div>
    );
};