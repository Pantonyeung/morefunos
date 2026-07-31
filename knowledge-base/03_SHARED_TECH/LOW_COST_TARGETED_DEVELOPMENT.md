# MoreFunOS｜Low-Cost Targeted Development

> Status: CURRENT SHARED TECHNOLOGY  
> Applies to: all MoreFunOS repositories and work branches

## Core flow

```text
single problem
→ isolate
→ reproduce
→ identify root cause
→ add smallest failing contract
→ apply one minimal fix
→ run targeted verification
→ run minimum affected regression
→ integrate
→ run one lowest-cost final gate
```

## Mandatory rules

- One branch and one work package should address one explicit problem or Contract boundary.
- Locate the root cause before changing runtime code.
- Do not mix unrelated fixes, refactors or documentation changes into one commit.
- Isolated branches should use targeted scripts, syntax checks and minimum regression instead of repeatedly running the complete suite.
- Documentation-only commits should not trigger expensive full CI.
- Browser, device, APK, signing and Production gates remain manual or Release gates unless specifically automated.
- Integration branches receive one deliberate final gate after isolated work passes.
- When hosted CI is unavailable, a reproducible equivalent environment may provide evidence, but the limitation must be recorded.
- Infrastructure failure must not be reported as code-test failure or false PASS.

## Failure protocol

On FAIL, timeout, permission denial, runtime mismatch, authentication failure, hydrate failure or deployment failure:

1. stop scope expansion;
2. preserve failing input, environment, branch and commit;
3. isolate the smallest failing unit;
4. collect evidence;
5. identify one root-cause hypothesis;
6. create or update the smallest failing test;
7. apply one fix;
8. rerun the isolated test;
9. run minimum affected regression;
10. merge only after the evidence boundary is explicit.

If repeated fixes fail, stop patch stacking and reassess the design boundary.

## Required record

Each completed checkpoint records:

- repository, branch, PR and head;
- exact problem and root cause;
- changed scope;
- targeted result;
- minimum regression result;
- deployment / browser / device result where applicable;
- CI cost or external blocker;
- rollback point;
- remaining gap and next action.

## Evidence discipline

Do not collapse these states:

- source implemented;
- contract passed;
- targeted passed;
- regression passed;
- deployed;
- browser verified;
- device accepted;
- production ready.

Each claim must be supported by its own evidence.
