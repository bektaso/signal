---
description: Initialize the standard /agent memory structure for the project
---

# Agent Memory Setup Workflow

This workflow sets up the standard `/agent` directory structure for long-term memory and configuration.

1.  Create the `/agent` directory.
    ```bash
    mkdir -p agent
    ```

2.  Create the standard markdown files.
    ```bash
    # Create empty template files
    echo "# Agent Role" > agent/role.md
    echo "# Project Constraints" > agent/constraints.md
    echo "# Decision Log" > agent/decision-log.md
    echo "# Tools" > agent/tools.md
    echo "# Long-term Memory" > agent/memory.md
    ```

3.  Create the configuration rule (Optional - for IDEs like Cursor).
    ```bash
    echo "You are a persistent agent. Use /agent folder as your long-term memory." > .cursorrules
    ```

4.  Verification
    - Check that `/agent` folder exists.
    - Check that all 5 markdown files exist.
