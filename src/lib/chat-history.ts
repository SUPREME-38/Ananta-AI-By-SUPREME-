import { supabase } from "@/integrations/supabase/client";

export type ModuleType = "chat" | "shopping" | "gaming" | "skills";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function loadChatHistory(module: ModuleType): Promise<ChatMessage[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("chat_history")
    .select("role, content")
    .eq("user_id", user.id)
    .eq("module", module)
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data.map((d) => ({ role: d.role as "user" | "assistant", content: d.content }));
}

export async function saveChatMessages(module: ModuleType, messages: { role: "user" | "assistant"; content: string }[]) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const rows = messages.map((m) => ({
    user_id: user.id,
    module,
    role: m.role,
    content: m.content,
  }));

  await supabase.from("chat_history").insert(rows);
}
