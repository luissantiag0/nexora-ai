import { prisma } from "./prisma";

export async function getAdminAnalytics() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - 7);

  const [
    totalUsers,
    newUsersThisMonth,
    premiumUsers,
    trialActiveUsers,
    totalLeads,
    leadsThisMonth,
    leadsGanados,
    pastDueUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.user.count({
      where: {
        OR: [
          { isPremium: true },
          { subscriptionStatus: "active" },
        ],
      },
    }),
    prisma.user.count({
      where: {
        trialEndsAt: { gte: now },
        isPremium: false,
      },
    }),
    prisma.lead.count(),
    prisma.lead.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.lead.count({ where: { status: "ganado" } }),
    prisma.user.count({
      where: { subscriptionStatus: "past_due" },
    }),
  ]);

  const newUsersThisWeek = await prisma.user.count({
    where: { createdAt: { gte: startOfWeek } },
  });

  const trialToPremium = await prisma.user.count({
    where: {
      isPremium: true,
      trialStartedAt: { not: null },
    },
  });

  const conversionRate =
    totalUsers > 0
      ? Math.round((premiumUsers / totalUsers) * 100)
      : 0;

  return {
    totalUsers,
    newUsersThisMonth,
    newUsersThisWeek,
    premiumUsers,
    trialActiveUsers,
    trialToPremium,
    totalLeads,
    leadsThisMonth,
    leadsGanados,
    pastDueUsers,
    conversionRate,
  };
}

export async function getUserDailySignups(days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const raw = await prisma.user.findMany({
    where: { createdAt: { gte: since } },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const byDay: Record<string, number> = {};

  for (const u of raw) {
    const key = u.createdAt.toISOString().slice(0, 10);
    byDay[key] = (byDay[key] || 0) + 1;
  }

  return byDay;
}

export async function getRecentActivity(limit = 10) {
  const [recentLeads, recentUsers] = await Promise.all([
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { id: true, name: true, email: true, createdAt: true },
    }),
  ]);

  return {
    recentLeads: recentLeads.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      status: l.status,
      createdAt: l.createdAt,
      user: l.user,
    })),
    recentUsers,
  };
}
