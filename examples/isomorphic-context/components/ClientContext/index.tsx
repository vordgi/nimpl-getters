'use client';

import { createContext } from "react";

const ClientContext = createContext<string | null>(null);

export default ClientContext;
