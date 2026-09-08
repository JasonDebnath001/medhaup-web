type MarkdownNode = {
  type: string;
  value?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: MarkdownNode[];
};

// Reveal the parsed tree rather than slicing Markdown syntax or Bengali letters.
// Links, emphasis and lists stay valid at every step of the animation.
export function rehypeRevealWords({ visibleWords }: { visibleWords: number }) {
  return (tree: MarkdownNode) => {
    if (!Number.isFinite(visibleWords)) return;
    let remaining = Math.max(0, Math.floor(visibleWords));
    let lastWord: MarkdownNode | undefined;

    function reveal(node: MarkdownNode): MarkdownNode[] {
      if (remaining <= 0) return [];
      if (node.type === "text") {
        const nodes: MarkdownNode[] = [];
        for (const token of node.value?.match(/\s+|\S+/gu) ?? []) {
          if (/^\s+$/u.test(token)) {
            nodes.push({ type: "text", value: token });
            continue;
          }
          if (remaining <= 0) break;
          remaining--;
          lastWord = {
            type: "element",
            tagName: "span",
            properties: { "data-reveal-word": "" },
            children: [{ type: "text", value: token }],
          };
          nodes.push(lastWord);
        }
        return nodes;
      }
      if (node.children) {
        node.children = node.children.flatMap(reveal);
        if (!node.children.length) return [];
      }
      return [node];
    }

    tree.children = tree.children?.flatMap(reveal);
    lastWord?.children?.push({
      type: "element",
      tagName: "span",
      properties: { "data-reveal-cursor": "", "aria-hidden": "true" },
      children: [],
    });
  };
}
